//
//  LCULDisplayNode.m
//  Test
//
//  Created by bawn on 29/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCULDisplayNode.h"
#import "LCPTextNode.h"
#import "LCLIDisplayNode.h"

#import <HTMLKit/HTMLKit.h>

@interface LCULDisplayNode ()<ASTextNodeDelegate>

@property (nonatomic, strong) NSMutableArray<LCLIDisplayNode *> *nodeArray;

@end

@implementation LCULDisplayNode

- (instancetype)initWithContent:(HTMLNode *)htmlNode delegate:(id<ASTextNodeDelegate>)delegate{
    self = [super init];
    if (self) {
        self.nodeArray = [NSMutableArray array];
        
        [htmlNode.childNodes enumerateObjectsUsingBlock:^(HTMLNode * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            if (obj.childNodesCount) {
                
                LCLIDisplayNode *node = [[LCLIDisplayNode alloc] initWithContent:obj delegate:delegate];
                [self addSubnode:node];
                [self.nodeArray addObject:node];
            }
        }];
    }
    return self;
}


- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize{
    [self.nodeArray enumerateObjectsUsingBlock:^(LCLIDisplayNode * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
        if (idx != self.nodeArray.count - 1) {
            obj.style.spacingAfter = 8.0f;
        }
    }];
    ASStackLayoutSpec *layout = [ASStackLayoutSpec verticalStackLayoutSpec];
    layout.justifyContent = ASStackLayoutJustifyContentStart;
    layout.alignItems = ASStackLayoutAlignItemsStretch;
    layout.children = self.nodeArray;
    
    ASInsetLayoutSpec *insetLayout = [ASInsetLayoutSpec insetLayoutSpecWithInsets:UIEdgeInsetsMake(0, 0, 20.0f, 0) child:layout];
    
    return insetLayout;
}

@end
