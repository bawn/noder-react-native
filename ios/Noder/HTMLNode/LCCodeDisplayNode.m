//
//  LCCodeDisplayNode.m
//  Test
//
//  Created by bawn on 31/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCCodeDisplayNode.h"
#import "LCCodeTextNode.h"
#import "UIColor+LCColor.h"

#import <HTMLKit/HTMLKit.h>
#import "EXTScope.h"

@interface LCCodeDisplayNode ()

@property (nonatomic, strong) ASScrollNode *scrollNode;
@property (nonatomic, strong) LCCodeTextNode *codeNode;

@end

@implementation LCCodeDisplayNode


- (instancetype)initWithContent:(HTMLNode *)htmlNode{
    self = [super init];
    if (self) {
        ASScrollNode *scrollNode = [[ASScrollNode alloc] init];
        scrollNode.backgroundColor = [UIColor lcCodeGrayColor];
        scrollNode.automaticallyManagesContentSize = YES;
        scrollNode.scrollableDirections = ASScrollDirectionHorizontalDirections;
        self.scrollNode = scrollNode;
        [self addSubnode:scrollNode];
        
        LCCodeTextNode *codeNode = [[LCCodeTextNode alloc] initWithContent:htmlNode.textContent];
        [scrollNode addSubnode:codeNode];
        self.codeNode = codeNode;
        
        @weakify(self);
        [scrollNode setLayoutSpecBlock:^ASLayoutSpec*(__kindof ASDisplayNode * _Nonnull node, ASSizeRange constrainedSize) {
            @strongify(self);
            return [ASInsetLayoutSpec insetLayoutSpecWithInsets:UIEdgeInsetsZero child:self.codeNode];
        }];

        
    }
    return self;
}


- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize{
    return [ASWrapperLayoutSpec wrapperWithLayoutElement:self.scrollNode];
}


@end
