//
//  LCLIDisplayNode.m
//  Test
//
//  Created by bawn on 29/03/2017.
//  Copyright © 2017 bawn. All rights reserved.
//

#import "LCLIDisplayNode.h"
#import "LCPTextNode.h"
#import "UIColor+LCColor.h"
#import "NSMutableAttributedString+LCLineSpace.h"

#import <HTMLKit/HTMLKit.h>

@interface LCLIDisplayNode ()

@property (nonatomic, strong) LCPTextNode *textNode;
@property (nonatomic, strong) ASDisplayNode *dotNode;

@end

@implementation LCLIDisplayNode

- (instancetype)initWithContent:(HTMLNode *)htmlNode delegate:(id<ASTextNodeDelegate>)delegate{
    self = [super init];
    if (self) {
        
        
//        [htmlNode enumerateChildNodesUsingBlock:^(HTMLNode * _Nonnull node, NSUInteger idx, BOOL * _Nonnull stop) {
//            if (node.hasChildNodes) {
////                NSOrderedSet *orderedSet = [node.childNodes filteredOrderedSetUsingPredicate:pres];
////                NSArray *contentArray = [orderedSet.array valueForKeyPath:@"textContent"];
////                NSArray *valueArray = [orderedSet.array valueForKeyPath:@"attributes.href"];
////                [aTagArray addObjectsFromArray:contentArray];
////                [hrefArray addObjectsFromArray:valueArray];
//                NSLog(@"%@, %@", node.name, node.textContent);
//            }
//        }];
        
        NSString *textContent = htmlNode.textContent;
        NSString *lineFeedString = @"\n";
        if ([textContent hasPrefix:lineFeedString]) {
            textContent = [textContent substringFromIndex:lineFeedString.length];
        }
        if ([textContent hasSuffix:lineFeedString]) {
            textContent = [textContent substringToIndex:textContent.length - lineFeedString.length];
        }
        
        NSPredicate *pres = [NSPredicate predicateWithFormat:@"name ==[c] %@", @"a"];
        
        NSOrderedSet *orderedSet = [htmlNode.childNodes filteredOrderedSetUsingPredicate:pres];
        NSArray *aTagArray = [orderedSet valueForKeyPath:@"textContent"];
        NSArray *hrefArray = [orderedSet valueForKeyPath:@"attributes.href"];
        LCPTextNode *textNode = [[LCPTextNode alloc] init];
        textNode.delegate = delegate;
        textNode.attributedText = [NSMutableAttributedString attributedWithLiString:textContent
                                                                       aStringArray:aTagArray
                                                                          hrefArray:hrefArray];
        self.textNode = textNode;
        [self addSubnode:textNode];
        
        
        ASDisplayNode *dotNode = [[ASDisplayNode alloc] init];
        dotNode.backgroundColor = [UIColor lcBlackColor];
        dotNode.cornerRadius = 2.5f;
        [self addSubnode:dotNode];
        self.dotNode = dotNode;
        
    }
    return self;
}


- (ASLayoutSpec *)layoutSpecThatFits:(ASSizeRange)constrainedSize{
    
    self.dotNode.style.layoutPosition = CGPointMake(10.0f, 7.0f);
    self.dotNode.style.preferredSize = CGSizeMake(5.0f, 5.0f);
    self.textNode.style.spacingBefore = 12.0f;
    self.textNode.style.maxWidth = ASDimensionMake(constrainedSize.max.width - 12.0f - 10.0f - 7.0f);
    
    ASAbsoluteLayoutSpec *absoluteLayout = [ASAbsoluteLayoutSpec absoluteLayoutSpecWithChildren:@[self.dotNode]];

    ASStackLayoutSpec *layout = [ASStackLayoutSpec horizontalStackLayoutSpec];
    layout.justifyContent = ASStackLayoutJustifyContentStart;
    layout.alignItems = ASStackLayoutAlignItemsStart;
    layout.children = @[absoluteLayout, self.textNode];
    
    ASInsetLayoutSpec *insetLayout = [ASInsetLayoutSpec insetLayoutSpecWithInsets:UIEdgeInsetsZero child:layout];
    
    return insetLayout;
}


@end
